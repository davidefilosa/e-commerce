'use client'

import React, { useRef } from 'react'
import { Footer, Media } from '../../../../payload/payload-types'
import { noHeaderFooterUrls, inclusions, profileNavItems } from '../../../costants'
import classes from './index.module.scss'
import { usePathname } from 'next/navigation'
import { Gutter } from '../../Gutter'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../Button'
import { motion, useInView } from 'framer-motion'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer.navItems || []
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div
      className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}
      style={{
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
      }}
    >
      <Gutter>
        <ul className={classes.inclusions}>
          {inclusions.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 1.25, delay: index * 0.5 }}
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={36}
                height={36}
                className={classes.icon}
              />
              <h5 className={classes.title}>{item.title}</h5>
              <p>{item.description}</p>
            </motion.li>
          ))}
        </ul>
      </Gutter>
      <footer className={classes.footer} ref={ref}>
        <Gutter>
          <div className={classes.wrap}>
            <Link href="/">
              <Image src="/logo-white.svg" alt="logo" width={170} height={50} />
            </Link>

            <p>{footer?.copyright}</p>
            <div className={classes.socialLinks}>
              {navItems.map(item => {
                const icon = item?.link?.icon as Media

                return (
                  <Button
                    key={item.link.label}
                    el="link"
                    href={item.link.url}
                    newTab={true}
                    className={classes.socialLinkItem}
                  >
                    <Image
                      src={icon?.url}
                      alt={item.link.label}
                      width={32}
                      height={32}
                      className={classes.socialIcon}
                    />
                  </Button>
                )
              })}
            </div>
          </div>
        </Gutter>
      </footer>
    </div>
  )
}

export default FooterComponent
