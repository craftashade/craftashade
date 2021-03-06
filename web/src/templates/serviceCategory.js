import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ServiceCategory from "../components/serviceCategory";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query ServiceCategoryTemplateQuery($title: String!, $ids: [String]) {
    frontpage: sanityPage(title: {eq: "Frontpage"}) {
      ...PageInfo
    }
    serviceCategories: allSanityServiceCategory {
      nodes {
        title
        services {
          title
        }
      }
    }
    serviceCategory: sanityServiceCategory(title: {eq: $title}) {
      description
      title
      image {
        image {
        ...SanityImage
        }
      }
      services {
        id
        thumbnail {
          image {
            ...SanityImage
          }
        }
        _rawThumbnail(resolveReferences: {maxDepth: 10})
        title
        _rawText
      }
    }
    servicesForRows: allSanityService(filter: {id: { in: $ids }}) {
      nodes {
        id
        thumbnail {
          image {
            ...SanityImage
          }
        }
        _rawThumbnail(resolveReferences: {maxDepth: 10})
        title
        _rawText
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      openGraph {
        title
        description
        image {
          ...SanityImage
        }
      }
      _rawAddress
      addressLink
      mobile
      tel
      email
      banner {
        disabled
        color {
          rgb {
            r
            g
            b
            a
          }
        }
        message
        page {
          ... on SanityRoute {
            slug {
              current
            }
          }
        }
        url
      }
    }
    navs: allSanityNavigationMenu {
      edges {
        node {
          title
          ...NavMenu
        }
      }
    }
    services: allSanityService {
      nodes {
        title
        serviceCategory {
          title
        }
      }
    }
    categories: allSanityServiceCategory {
      nodes {
        title
        image {
          image {
            ...SanityImage
          }
        }
        _rawImage(resolveReferences: {maxDepth: 10})
      }
    }
    projects: allSanityProject {
      nodes {
        images {
          image {
            ...SanityImage
          }
        }
        thumbnail {
          image {
            ...SanityImage
          }
        }
        title
        _rawThumbnail(resolveReferences: {maxDepth: 10})
      }
    }
  }
`;

const ServiceCategoryTemplate = props => {
  const { data, errors } = props;
  const services = data && data.services;
  const serviceCategory = data && data.serviceCategory;
  return (
    <Layout showNav={true} data={data} textWhite={false}>
      {errors && <SEO title="GraphQL Error" />}
      {serviceCategory && (
        <SEO
          title={`Service | ${serviceCategory.title}` || "Untitled"}
          description={serviceCategory.description}
          image={serviceCategory.image.image}
          keywords={[serviceCategory.title, "service"]}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {serviceCategory && <ServiceCategory data={data} />}
    </Layout>
  );
};

export default ServiceCategoryTemplate;
