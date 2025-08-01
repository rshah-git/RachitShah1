import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type SignupForm = z.infer<typeof signupSchema>;

export function NewsletterSignup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
          },
        ]);

      if (error) {
        if (error.code === '23505') {
          setStatus('error');
          setMessage('This email is already subscribed.');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('Welcome! You\'ve successfully joined our newsletter.');
        reset();
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {status === 'success' && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-green-800 text-sm font-light">{message}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm font-light">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('firstName')}
              type="text"
              placeholder="First name"
              className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 font-light"
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600 font-light">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 font-light"
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600 font-light">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 font-light"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 font-light">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-6 font-light">
        No spam, ever. Unsubscribe at any time.
      </p>
    </div>
  );
}