import { MetadataRoute } from 'next';
import { projects } from '../../content/projects';
import { site } from '../../content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.siteUrl;

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectPages,
  ];
}
