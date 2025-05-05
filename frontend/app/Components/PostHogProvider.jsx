"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"

export function PostHogProvider({ children }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      person_profiles: 'always',
      capture_pageview: false, // We capture pageviews manually
      capture_pageleave: true, // Enable pageleave capture
      debug: process.env.NODE_ENV === "development",
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) {
        url += "?" + search
      }
      posthog.capture("$pageview", { "$current_url": url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}

function PostHogAuthWrapper({ children }) {
  const auth = useAuth();
  const userInfo = useUser();

  useEffect(() => {
    if (auth.isSignedIn) {
      posthog.identify(auth.userId, {
        email: userInfo.user?.emailAddresses[0]?.emailAddress,
        name: userInfo.user?.fullName,
      });
    } 
    else if (!auth.isSignedIn)
    {
      posthog.reset();
    }
  }, [auth, userInfo])

  return children;
}
