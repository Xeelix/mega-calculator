export default function Home() {
  // This page will be handled by middleware which will redirect
  // to the appropriate location based on auth status
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Mega Calculator</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
}
