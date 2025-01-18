import TypingTest from '@/components/TypingTest';

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">CodeType</h1>
        <p className="text-inactive">Improve your coding speed with typing practice</p>
      </header>
      
      <TypingTest />
    </div>
  );
}
