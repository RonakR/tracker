import { ApolloClient } from 'apollo-client'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient()

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  WithApollo.getInitialProps = async ctx => {
    const { AppTree } = ctx
    const apolloClient = (ctx.ApolloClient = initApolloClient())

    let pageProps = {}
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx)
    }

    // if on server
    if (typeof window === 'undefined') {
      if (ctx.res && ctx.res.finished) {
        return pageProps
      }

      try {
        const { getDataFromTree } = await import('@apollo/react-ssr')
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        )
      } catch (e) {
        console.error(e)
      }

      Head.rewind()
    }

    const apolloState = apolloClient.cache.extract()
    return {
      ...pageProps,
      apolloState
    }
  }

  return WithApollo
}

const initApolloClient = (initialState = {}) => {
  const cache = new InMemoryCache().restore(initialState)
  const link = new HttpLink({
    uri: 'http://localhost:3000/api/graphql'
  })
  const ssrMode = typeof window === 'undefined'

  const client = new ApolloClient({
    ssrMode,
    link,
    cache
  })

  return client
}
