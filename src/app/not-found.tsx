import Footer from "@/components/shared/Footer";
import Container from "@/components/Container";
import { Discord } from "@/components/Icons";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main>
        <Container className="flex-1">
          <section className="w-full py-12 md:py-20 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Oops! Page Not Found
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <Search />
                </div>
                <div className="w-full max-w-lg">
                  <svg width="512" height="350" viewBox="0 0 960 960">
                    <use href="/404.svg#404"></use>
                  </svg>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    If you&apos;re experiencing issues or something seems wrong,
                    let us know on our Discord server!
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 mt-8">
                  <Button radius="sm">
                    <Link href="/home" className="flex items-center gap-2">
                      Go back home <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button radius="sm">
                    <Link
                      target="_blank"
                      href="https://discord.gg/vkYvY4D3RA"
                      className="flex items-center"
                    >
                      <Discord className="mr-2 h-4 w-4" />
                      Join our Discord
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
