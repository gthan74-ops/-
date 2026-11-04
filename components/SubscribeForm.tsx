'use client';
import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Stibee API 연동 예정
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6">
        <p className="serif text-lg" style={{ color: 'var(--accent)' }}>
          구독 신청이 완료되었습니다.
        </p>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          내일 아침, 당신의 오늘의 시가 도착합니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 주소를 입력하세요"
        required
        className="flex-1 px-4 py-3 rounded-lg text-sm outline-none border transition-colors"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
          color: 'var(--text)',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-lg text-sm font-medium transition-all"
        style={{ background: 'var(--accent)', color: '#0c0c0c' }}
      >
        {status === 'loading' ? '처리 중...' : '매일 받기'}
      </button>
    </form>
  );
}
