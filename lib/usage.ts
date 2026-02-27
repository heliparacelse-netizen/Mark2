import { userStore } from '@/lib/auth';

export function getUsageByEmail(email: string) {
  const user = userStore.find((item) => item.email === email);
  return user?.generationsUsed ?? 0;
}

export function incrementUsageByEmail(email: string) {
  const user = userStore.find((item) => item.email === email);
  if (!user) return 0;
  user.generationsUsed += 1;
  return user.generationsUsed;
}
