'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button, Card, CardBody } from '@heroui/react';
import { signup } from '../../lib/api';
import Doodles from '../../components/Doodles';
import WobbleButton from '../../components/WobbleButton'
import ConfettiBurst from '../../components/ConfettiBurst'
import DoodleBorder from '../../components/DoodleBorder';



export default function SignupPage() {
  const [confetti, setConfetti] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (form: FormData) => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 1200)
    setError(null);
    setLoading(true);

    try {
      const name = form.get('name') as string;
      const email = form.get('email') as string;
      const password = form.get('password') as string;

      const res = await signup({ name, email, password });

      localStorage.setItem('sketcha_token', res.token);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Doodles/>
      <Card
        className="max-w-md w-full bg-white/90 border border-white/60 backdrop-blur-lg shadow-lg"
        radius="lg"
      >
        <DoodleBorder>
        <CardBody>
          <h2 className="text-2xl font-bold mb-2">Create your Sketcha account</h2>
          <p className="text-sm text-slate-600 mb-6">Let’s get sketching.</p>

          <form action={handleSubmit} className="space-y-4">
            <Input
              radius="lg"
              name="name"
              label="Name"
              variant="bordered"
              required
            />

            <Input
              radius="lg"
              type="email"
              name="email"
              label="Email"
              variant="bordered"
              required
            />

            <Input
              radius="lg"
              type="password"
              name="password"
              label="Password"
              variant="bordered"
              required
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between pt-2">
              <div className="relative">
                  <WobbleButton type="submit" isLoading={loading} className="bg-white">
                    Create Account
                  </WobbleButton>
                <ConfettiBurst trigger={confetti} />
              </div>

              <Link href="/signin" className="text-sm underline">
                Have an account?
              </Link>
            </div>
          </form>
        </CardBody>
        </DoodleBorder>
      </Card>
    </div>
  );
}