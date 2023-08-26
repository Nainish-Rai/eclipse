import { CreateAccount } from "./components/create-account";

export default function Home() {
  return (
    <main className=" animate-ltr-linear-infinite bg-repeat flex justify-center items-center  h-screen bg-black bg-[url('../public/hero.png')]">
      <CreateAccount />
    </main>
  );
}
