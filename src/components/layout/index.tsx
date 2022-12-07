import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'

interface LayoutProps {
  children?: React.ReactNode
}

export function Layout({ children }: LayoutProps){
  return (
    <LinearGradient 
      colors={[
        '#171717',
        '#111827'
      ]} 
      start={{ x: 0, y: 1 }} 
      end={{ x: 0, y: 0}}
      style={{
        flex: 1
      }}
    >
      {children}
    </LinearGradient>
  )
}