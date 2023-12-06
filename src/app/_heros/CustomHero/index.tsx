'use client'

import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import { motion } from 'framer-motion'

import classes from './index.module.scss'

export const CustomHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  const mediaUrl =
    media &&
    typeof media !== 'string' &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${media.filename}`

  return (
    <motion.section
      className={classes.hero}
      initial={{ opacity: 0, filter: 'blur(15px)' }}
      animate={{ opacity: [0, 1, 1], filter: ['blur(15px)', 'blur(15px)', 'blur(0px)'] }}
      transition={{ duration: 3 }}
    >
      <div className={classes.heroWrapper} style={{ backgroundImage: `url(${mediaUrl})` }}>
        <motion.div
          className={classes.heroTextBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <RichText content={richText} />

          {Array.isArray(links) && links.length > 0 && (
            <ul className={classes.links}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
