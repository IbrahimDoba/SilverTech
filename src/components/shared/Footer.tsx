import Link from "next/link";
import Container from "../Container";
import { AcmeLogo } from "../Icons";

function Footer() {
  return (
    <footer className="relative h-20 bg-background">
      <Container className="border-t dark:border-t-foreground-100">
        <div className="flex flex-col justify-between gap-10 pb-16 lg:pb-24 pt-10 lg:flex-row">
          <div className="sm:col-span-3">
          <Link href="/" className='text-default-foreground mb- flex w-fit items-center gap-2'>
            <AcmeLogo />
            <p className='font-bold text-inherit'>QUILLSTASH</p>
          </Link>
            <p className="mb-1 text-sm text-foreground-600 capitalize">
              write, share, discover
            </p>
            <p className="max-w-prose text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Quillstash all rights
              reserved
            </p>
            <ul className="mt-4 flex gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="https://x.com/ibrahimdoba"
                  target="_blank"
                  className="underline-offset-2 hover:underline"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/ibrahimdoba/quillstash"
                  target="_blank"
                  className="underline-offset-2 hover:underline"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/vkYvY4D3RA"
                  target="_blank"
                  className="underline-offset-2 hover:underline"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-20">
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium">Contact Us</p>
              <Link
                href="mailto:info@quillstash.com"
                className="text-muted-foreground underline-offset-2 hover:underline"
              >
                Email
              </Link>
              <Link
                href="/"
                className="text-muted-foreground underline-offset-2 hover:underline"
              >
                Discord
              </Link>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium">Legal</p>
              <Link
                href="/terms"
                className="text-muted-foreground underline-offset-2 hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground underline-offset-2 hover:underline"
              >
                Privacy
              </Link>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium">Website</p>
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="text-muted-foreground underline-offset-2 hover:underline"
              >
                Sitemap
              </Link>
              <Link
                href="/rss.xml"
                target="_blank"
                className="text-muted-foreground underline-offset-2 hover:underline"
              >
                RSS Feed
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;