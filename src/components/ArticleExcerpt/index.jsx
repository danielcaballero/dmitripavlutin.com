import React from 'react';
import Link from 'gatsby-link';
import R from 'ramda';
import Img from 'gatsby-image';

import styles from './index.module.scss';

import Tag from '../Tag';

const getTitle = R.flip(R.pathOr)(['frontmatter', 'title']);

export default function ArticleExcerpt({ node }) {
  const slug = node.frontmatter.slug;
  const title = getTitle(slug, node);
  const sizes = node.frontmatter.thumbnail.childImageSharp.sizes;
  const tags = node.frontmatter.tags.map(function(tagName, index) {
    return <Tag name={tagName} key={index} />;
  });
  return (
    <article key={slug} className={styles.excerpt}>
      <Link to={slug} className={styles.thumbnailAnchor}>
        <Img sizes={sizes} />
      </Link>
      <div className={styles.content} >
        <h4>
          <Link to={slug}>
            {title}
          </Link>
        </h4>
        <div>
          <span dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          &nbsp; <Link to={slug}>Continue reading</Link>
        </div>
        <div className={styles.date}>
          <div className={styles.tags}>{tags}</div>
          <small>{node.frontmatter.date}</small>
        </div>
      </div>
    </article>
  );
}