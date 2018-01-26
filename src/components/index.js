import React, { Component } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Link
} from '@react-pdf/core'

const styles = StyleSheet.create({
  page: {
    //flexDirection: 'row',
    backgroundColor: '#fff'
  },
  section: {
    width: 500,
    marginTop: 10,
    marginBottom: 10
  },
  titleblock: {
    width: 500,
    marginTop: 20,
    marginBottom: 40
  },
  text: {
    columns: 2,
    width: 500,
    fontSize: 12,
    lineHeight: 2, // not supported.
    // align: 'justify'
    // fontFamily: 'Rubis Regular',
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold', // not supported.
    marginBottom: 5,
    // fontFamily: 'Republik',
  },
  lead: {
    fontSize: 16,
    marginBottom: 5,
    // fontFamily: 'Rubis Regular',
  },
  credit: {
    fontSize: 12,
    // fontFamily: 'GT America Regular'
  },
  listitem: {
    fontSize: 13,
    // fontFamily: 'Rubis Regular',
  },
  link: {
    color: '#00508C',
    fontSize: 13,
    // fontFamily: 'GT America Regular'
  },
  strong: {
    color: '#000',
    fontSize: 13,
    // fontFamily: 'Rubis Bold',
    textDecoration: 'none'
  },
  missing: {
    backgroundColor: '#FF5555',
    fontSize: 12
  },
  missingInline: {
    color: '#FF5555',
    fontSize: 13,
  },
  image: { backgroundColor: 'grey', padding: 0, maxWidth: 500 },
  item: {
    flexDirection: 'row',
    marginBottom: 5
  },
  itemLeftColumn: {
    flexDirection: 'column',
    marginRight: 10
  },
  itemRightColumn: {
    flexDirection: 'column',
    flexGrow: 9
  },
  bulletPoint: {
    fontSize: 13,
    // fontFamily: 'Rubis Regular'
  },
  itemContent: {
    fontSize: 10
  }
})

// These font files must be available in /lib/components/fonts,
// otherwise things break.

// Font.register(`${__dirname}/fonts/gt-america-standard-regular.ttf`, {
//   family: 'GT America Regular'
// })

// Font.register(`${__dirname}/fonts/rubis-regular.ttf`, {
//   family: 'Rubis Regular'
// })

// Font.register(`${__dirname}/fonts/rubis-bold.ttf`, {
//   family: 'Rubis Bold'
// })

// Font.register(`${__dirname}/fonts/RepublikSerif-Black.ttf`, {
//   family: 'Republik'
// })

export const MissingPdfNode = ({ node, ancestors, children }) => {
  const message = `Missing Markdown node type "${node.type}" ${node.identifier ? `with identifier "${node.identifier}"` : ''} `

  if (ancestors.find(parent => parent.type === 'paragraph')) {
    return <Link style={styles.missingInline}>{message}</Link>
  }

  return (
    <View style={styles.section}>
      <Text style={styles.missing}>
        {message}
      </Text>
    </View>
  )
}

export const TITLEBLOCK = ({ children, ...props }) => (
  <View {...props} style={styles.titleblock}>
    {children}
  </View>
)

// trying out refs
// export class P extends Component {
//   constructor (...args) {
//     super(...args)
//     this.setRef = ref => {
//       this.p = ref
//     }
//   }
//   componentDidMount () {
//     // console.log(this.p.getHeight(400))
//   }
//   render () {
//     const { children } = this.props
//     return (
//       <Text ref={this.setRef} style={styles.text}>
//         {children}
//       </Text>
//     )
//   }
// }

export const P = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>
}

export const A = ({ children, href }) => {
  return <Link style={styles.link} src={href}>{children}</Link>
}

export const STRONG = ({ children }) => {
  // react-pdf's Text expects canonical inline children with a render() method,
  // so let's abuse Link for now. We should eventually use some generic
  // react-pdf compatible inline element.
  return <Link style={styles.strong}>{children}</Link>
}

export const H1 = ({ children }) => {
  return <Text style={styles.headline}>{children}</Text>
}

// Create Document Component
export const LEAD = ({ children }) => {
  return <Text style={styles.lead}>{children}</Text>
}

export const CREDIT = ({ children }) => {
  return <Text style={styles.credit}>{children}</Text>
}

export const IMG = ({ src }) => {
  return <Image style={styles.image} src={src} />
}

export const LIST = ({ data, children }) => {
  return <View style={styles.section}>{children}</View>
}

export const LISTITEM = ({ node, index, parent, children }) => {
  const bullet = parent.ordered ? `${index + 1}.` : '–'
  return (
    <View style={styles.item}>
      <View style={styles.itemLeftColumn}>
        <Text style={styles.bulletPoint}>{bullet}</Text>
      </View>
      <View style={styles.itemRightColumn}>{children}</View>
    </View>
  )
}
export const LISTITEMP = ({ children }) => {
  return <Text style={styles.listitem}>{children}</Text>
}
