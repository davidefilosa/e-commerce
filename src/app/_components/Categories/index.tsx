'use client'

import React, { useRef } from 'react'
import Link from 'next/link'

import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategoryCard'

import classes from './index.module.scss'
import { motion, useInView } from 'framer-motion'

const Categories = ({ categories }: { categories: Category[] }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop by Categories</h3>
        <Link href="/products">Show All</Link>
      </div>

      <div className={classes.list}>
        {categories.map((category, index) => {
          return (
            <motion.div
              ref={ref}
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 1.25, delay: index * 0.5 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default Categories
