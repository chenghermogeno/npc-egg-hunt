import { SignupForm } from "../components/SignUpForm";

export default function Page() {
  return (
    <div
      style={{
        backgroundImage: "url('/bg-main.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex flex-col items-center justify-center bg-white bg-opacity-70"
    >
      <SignupForm />
    </div>
  );
}
