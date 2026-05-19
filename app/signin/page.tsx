import SignInScreen from "@/components/auth/sign-in-screen";

interface SignInPageProps {
  searchParams?: Promise<{
    mode?: string;
  }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const initialMode =
    params?.mode === "signup" || params?.mode === "forgot" || params?.mode === "resetSent"
      ? params.mode
      : "login";

  return <SignInScreen initialMode={initialMode} />;
}
