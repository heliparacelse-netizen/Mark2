'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useI18n } from '@/lib/i18n';

export default function RegisterPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (response.ok) {
      await signIn('credentials', { email, password, redirect: false });
      router.push('/dashboard');
    }
  };

  return (
    <main>
      <Navbar />
      <section className="section-shell flex items-center justify-center pt-32">
        <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-borderDark bg-bgCard p-8">
          <h1 className="text-2xl font-semibold">{t('auth.registerTitle')}</h1>
          <label className="mt-5 block text-sm">{t('auth.name')}</label>
          <input className="mt-2 w-full rounded-xl border border-borderDark bg-bgSecondary px-4 py-3" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="mt-4 block text-sm">{t('auth.email')}</label>
          <input className="mt-2 w-full rounded-xl border border-borderDark bg-bgSecondary px-4 py-3" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="mt-4 block text-sm">{t('auth.password')}</label>
          <input type="password" className="mt-2 w-full rounded-xl border border-borderDark bg-bgSecondary px-4 py-3" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label className="mt-4 block text-sm">{t('auth.confirmPassword')}</label>
          <input type="password" className="mt-2 w-full rounded-xl border border-borderDark bg-bgSecondary px-4 py-3" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <button className="btn-premium mt-6 w-full">{t('auth.registerButton')}</button>
          <Link className="mt-4 block text-sm text-textSecondary" href="/login">{t('auth.switchToLogin')}</Link>
        </form>
      </section>
    </main>
  );
}
