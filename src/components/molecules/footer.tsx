import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              <span className="text-primary">Hills</span>
              <span className="text-secondary">Quills</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Uttarakhand's premier news source, bringing you the latest stories from the hills.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/profile.php?id=61552272283117" className="text-gray-400 hover:text-gray-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/HillsQuills" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/hillsquills/" className="text-gray-400 hover:text-gray-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/channel/UChul9XPQ5BvsldrmEXUsCLg" className="text-gray-400 hover:text-gray-600">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">CATEGORIES</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/top-news" className="text-gray-600 hover:text-primary">
                  Top News
                </Link>
              </li>
              <li>
                <Link href="/web-stories" className="text-gray-600 hover:text-primary">
                  Web Stories
                </Link>
              </li>
              <li>
                <Link href="/kumaon" className="text-gray-600 hover:text-primary">
                  Kumaon
                </Link>
              </li>
              <li>
                <Link href="/garhwal" className="text-gray-600 hover:text-primary">
                  Garhwal
                </Link>
              </li>
            </ul>
          </div>

          {/* Districts */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">DISTRICTS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/region/Dehradun" className="text-gray-600 hover:text-primary">
                  Dehradun
                </Link>
              </li>
              <li>
                <Link href="/region/Haridwar" className="text-gray-600 hover:text-primary">
                  Haridwar
                </Link>
              </li>
              <li>
                <Link href="/region/Nainital" className="text-gray-600 hover:text-primary">
                  Nainital
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Uttarkashi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Almora
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">CONTACT US</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>Dehradun, Uttarakhand</p>
              <p className="pt-2">
                <a href="mailto:hillsquills@gmail.com" className="hover:text-primary">
                 hillsquills@gmail.com
                </a>
              </p>
              <p>+91 135 2712XXX</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              © 2025 HillsQuills - Uttarakhand's Chronicle. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <Link href="#" className="hover:text-gray-700">
                About Us
              </Link>
              <Link href="#" className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-gray-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
