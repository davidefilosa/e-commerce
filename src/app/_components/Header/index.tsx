'use client'

{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { Header } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import { HeaderComponent } from './HeaderComponent'

export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {}

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <HeaderComponent header={header} />
    </motion.div>
  )
}
