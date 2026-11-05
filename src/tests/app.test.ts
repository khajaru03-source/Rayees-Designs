import test from 'node:test';
import assert from 'node:assert/strict';
import { projects, getProjectBySlug, getRelatedProjects } from '../data/projects.ts';
import { serviceCategories } from '../data/services.ts';
import { translations } from '../data/translations.ts';

test('projects catalog data integrity', () => {
  assert.ok(projects.length >= 8, 'Should have at least 8 curated authentic projects');

  for (const project of projects) {
    assert.ok(project.id, 'Project must have an id');
    assert.ok(project.slug, 'Project must have a slug');
    assert.ok(project.title.en, 'Project must have an English title');
    assert.ok(project.title.ar, 'Project must have an Arabic title');
    assert.ok(project.coverImage, 'Project must have a cover image');
    assert.ok(project.coverImage.startsWith('/assets/aistudio/'), 'Project image must point to real uploaded asset');
    assert.ok(project.summary.en && project.summary.ar, 'Project must have bilingual summary');
    assert.ok(project.concept.en && project.concept.ar, 'Project must have bilingual concept');
    assert.ok(project.approach.en && project.approach.ar, 'Project must have bilingual approach');
  }
});

test('three core categories (Logo Design, Branding, Social Media) have authentic assets', () => {
  const logoProjects = projects.filter((p) => p.categoryKey === 'logo');
  const brandingProjects = projects.filter((p) => p.categoryKey === 'branding');
  const socialProjects = projects.filter((p) => p.categoryKey === 'social');

  assert.ok(logoProjects.length >= 2, 'Logo Design must have at least 2 authentic projects');
  assert.ok(brandingProjects.length >= 2, 'Branding must have at least 2 authentic projects');
  assert.ok(socialProjects.length >= 2, 'Social Media must have at least 2 authentic projects');

  // Verify specific new uploaded assets
  assert.ok(
    logoProjects.some((p) => p.coverImage === '/assets/aistudio/image_b8447de2.png'),
    'Logo Design must include A.A. India Travels 3D emblem'
  );
  assert.ok(
    socialProjects.some((p) => p.coverImage === '/assets/aistudio/image_b4b7fc39.png'),
    'Social Media must include BitLead Media multi-brand campaign grid'
  );
});

test('getProjectBySlug helper resolves existing and handles missing slugs', () => {
  const travelProject = getProjectBySlug('aa-india-travels-kashmir-logo');
  assert.ok(travelProject, 'Should find A.A. India Travels project');
  assert.equal(travelProject?.slug, 'aa-india-travels-kashmir-logo');

  const bitlead = getProjectBySlug('bitlead-social-media-campaigns');
  assert.ok(bitlead, 'Should find BitLead Social Media project');

  const missing = getProjectBySlug('non-existent-project-xyz');
  assert.equal(missing, undefined, 'Missing slug should return undefined');
});

test('getRelatedProjects returns other projects excluding current', () => {
  const currentSlug = 'aa-india-travels-kashmir-logo';
  const related = getRelatedProjects(currentSlug, 3);
  assert.equal(related.length, 3);
  assert.ok(related.every((p) => p.slug !== currentSlug), 'Related projects should exclude the current one');
});

test('services structure covers all 4 mandatory categories', () => {
  const categoryIds = serviceCategories.map((c) => c.id);
  assert.deepEqual(categoryIds, [
    'brand-identity',
    'digital-design',
    'marketing-print',
    'multimedia',
  ]);

  // Find printing service
  const printCategory = serviceCategories.find((c) => c.id === 'marketing-print');
  assert.ok(printCategory, 'Marketing & Print category must exist');

  const printService = printCategory?.services.find((s) => s.id === 'printing-services-india');
  assert.ok(printService, 'Commercial Printing Services must exist');
  assert.match(printService?.highlight?.en || '', /all over India/i, 'Printing services must highlight pan-India availability');
});

test('translations dictionary completeness & anti-portfolio rule', () => {
  assert.ok(translations.en, 'English translations exist');
  assert.ok(translations.ar, 'Arabic translations exist');

  // Verify navigation labels
  assert.equal(translations.en.nav.myWork, 'MY WORK', 'Work link must be MY WORK');
  assert.equal(translations.ar.nav.myWork, 'أعمالي', 'Work link in Arabic');

  // Strict constraint: Do not use the word "Portfolio" as a website page name or navigation label
  assert.ok(
    !translations.en.nav.myWork.toLowerCase().includes('portfolio'),
    'Navigation must not contain the word Portfolio'
  );
  assert.ok(
    !translations.en.myWorkPage.pageTitle.toLowerCase().includes('portfolio'),
    'Work page title must not contain the word Portfolio'
  );
});

test('typography configuration specifies elegant Manrope and IBM Plex Sans Arabic', async () => {
  const fs = await import('node:fs');
  const css = fs.readFileSync('src/index.css', 'utf-8');
  assert.match(css, /Manrope/, 'index.css must configure Manrope for English');
  assert.match(css, /IBM Plex Sans Arabic/, 'index.css must configure IBM Plex Sans Arabic for Arabic');

  const html = fs.readFileSync('index.html', 'utf-8');
  assert.match(html, /family=Manrope/, 'index.html must link Manrope');
  assert.match(html, /family=IBM\+Plex\+Sans\+Arabic/, 'index.html must link IBM Plex Sans Arabic');
  assert.match(html, /rel="preload"/, 'index.html must preload font stylesheet');
});
