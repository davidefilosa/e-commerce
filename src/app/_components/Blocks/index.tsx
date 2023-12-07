'use client'

import React, { Fragment, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import { Page } from '../../../payload/payload-types.js'
import { ArchiveBlock } from '../../_blocks/ArchiveBlock'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import { ContentBlock } from '../../_blocks/Content'
import { MediaBlock } from '../../_blocks/MediaBlock'
import { RelatedProducts, type RelatedProductsProps } from '../../_blocks/RelatedProducts'
import { toKebabCase } from '../../_utilities/toKebabCase'
import { BackgroundColor } from '../BackgroundColor/index'
import { VerticalPadding, VerticalPaddingOptions } from '../VerticalPadding/index'

const blockComponents = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  archive: ArchiveBlock,
  relatedProducts: RelatedProducts,
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0] | RelatedProductsProps)[]
  disableTopPadding?: boolean
}> = props => {
  const { disableTopPadding, blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            // the cta block is containerized, so we don't consider it to be inverted at the block-level
            const blockIsInverted =
              'invertBackground' in block && blockType !== 'cta' ? block.invertBackground : false
            const prevBlock = blocks[index - 1]

            const prevBlockInverted =
              prevBlock && 'invertBackground' in prevBlock && prevBlock?.invertBackground

            const isPrevSame = Boolean(blockIsInverted) === Boolean(prevBlockInverted)

            let paddingTop: VerticalPaddingOptions = 'large'
            let paddingBottom: VerticalPaddingOptions = 'large'

            if (prevBlock && isPrevSame) {
              paddingTop = 'none'
            }

            if (index === blocks.length - 1) {
              paddingBottom = 'large'
            }

            if (disableTopPadding && index === 0) {
              paddingTop = 'none'
            }

            if (Block) {
              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                  transition={{ duration: 1, delay: 0.5 * index }}
                >
                  <BackgroundColor invert={blockIsInverted}>
                    <VerticalPadding top={paddingTop} bottom={paddingBottom}>
                      <Block
                        // @ts-expect-error
                        id={toKebabCase(blockName)}
                        {...block}
                      />
                    </VerticalPadding>
                  </BackgroundColor>
                </motion.div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
