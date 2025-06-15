export default function Terms() {
  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p>
        By using this platform, you agree to:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li>Submit truthful, non-abusive messages.</li>
        <li>Pay ₹11 to lock your message for 365 days.</li>
        <li>Not expect any edits or deletions after payment.</li>
        <li>Accept our decision on content moderation.</li>
      </ul>
      <p className="mt-4">This service is experimental and for entertainment purposes.</p>
    </main>
  );
}
