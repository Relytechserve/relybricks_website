import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-stone-900">Customer access is admin managed</h1>
        <p className="mt-3 text-stone-600">
          Account creation is disabled for customers. Please contact RelyBricks support to get your login credentials.
        </p>
        <p className="mt-6 text-center text-sm text-stone-600">
          <Link
            href="/login"
            className="text-accent-600 hover:underline font-medium"
          >
            Go to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
