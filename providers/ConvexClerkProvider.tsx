'use client'

import React, { ReactNode } from 'react'
import {
    Authenticated,
    AuthLoading,
    ConvexReactClient,
    Unauthenticated,
} from 'convex/react'
import { ClerkProvider, SignUp, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import Loading from '@/components/Loading'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const convexClient = new ConvexReactClient(convexUrl!)

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
                <Authenticated>{children}</Authenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
                <Unauthenticated>
                    <SignUp routing="hash" />
                </Unauthenticated>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
export default ConvexClerkProvider
