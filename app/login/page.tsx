'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useI18n } from '@/lib/i18n';

export default function LoginPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', { email, password, redirect: false });
    if (!result?.error) router.push('/dashboard');
  };

  return (
    <main>
      <Navbar />
      <section className="section-shell flex items-center justify-center pt-32">
        <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-borderDark bg-bgCard p-8">
          <h1 className="text-2xl font-semibold">{t('auth.loginTitle')}</h1>
          <label className="mt-5 block text-sm">{t('auth.email')}</label>
          <input className="mt-2 w-full rounded-xl border border-borderDark bg-bgSecondary px-4 py-3" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="mt-4 block text-sm">{t('auth.password')}</label>
          <input type="password" className="mt-2 w-full rounded-xl border border-borderDark bg-bgSecondary px-4 py-3" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn-premium mt-6 w-full">{t('auth.loginButton')}</button>
          <Link className="mt-4 block text-sm text-textSecondary" href="/register">{t('auth.switchToRegister')}</Link>
        </form>
      </section>
    </main>
  );
}
