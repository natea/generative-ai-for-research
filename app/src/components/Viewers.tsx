import { useEffect, useState } from 'react';
import { marked } from 'marked';
import type { ContentBlock } from '../content/types';

function VideoEmbed({ youtubeId, title, note, playlistId }: { youtubeId: string; title: string; note?: string; playlistId?: string }) {
  const src = playlistId
    ? `https://www.youtube.com/embed/${youtubeId}?list=${playlistId}`
    : `https://www.youtube.com/embed/${youtubeId}`;
  return (
    <figure className="viewer viewer-video">
      <figcaption>
        <span className="viewer-tag tag-video">Watch</span> {title}
        {note && <span className="viewer-note"> — {note}</span>}
      </figcaption>
      <div className="frame-16x9">
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </figure>
  );
}

function SlidesEmbed({ googleId, title }: { googleId: string; title: string }) {
  return (
    <figure className="viewer viewer-slides">
      <figcaption>
        <span className="viewer-tag tag-slides">Slides</span> {title}
        <a className="viewer-open" href={`https://docs.google.com/presentation/d/${googleId}/edit`} target="_blank" rel="noopener noreferrer">
          Open in Google Slides ↗
        </a>
      </figcaption>
      <div className="frame-16x9">
        <iframe
          src={`https://docs.google.com/presentation/d/${googleId}/embed?start=false&loop=false&delayms=60000`}
          title={title}
          allowFullScreen
        />
      </div>
    </figure>
  );
}

function DocEmbed({ googleId, title }: { googleId: string; title: string }) {
  return (
    <figure className="viewer viewer-doc">
      <figcaption>
        <span className="viewer-tag tag-notes">Notes</span> {title}
        <a className="viewer-open" href={`https://docs.google.com/document/d/${googleId}/edit`} target="_blank" rel="noopener noreferrer">
          Open in Google Docs ↗
        </a>
      </figcaption>
      <div className="frame-doc">
        <iframe src={`https://docs.google.com/document/d/${googleId}/preview`} title={title} />
      </div>
    </figure>
  );
}

function PdfEmbed({ url, title, note }: { url: string; title: string; note?: string }) {
  return (
    <figure className="viewer viewer-pdf">
      <figcaption>
        <span className="viewer-tag tag-read">Read</span> {title}
        {note && <span className="viewer-note"> — {note}</span>}
        <a className="viewer-open" href={url} target="_blank" rel="noopener noreferrer">
          Open PDF ↗
        </a>
      </figcaption>
      <div className="frame-doc">
        <object data={url} type="application/pdf" aria-label={title}>
          <div className="pdf-fallback">
            <p>This PDF can’t be displayed inline in your browser.</p>
            <a className="btn btn-secondary" href={url} target="_blank" rel="noopener noreferrer">
              Open the PDF in a new tab ↗
            </a>
          </div>
        </object>
      </div>
    </figure>
  );
}

/* Minimal client-side .ipynb renderer: markdown cells via marked, code cells as <pre>. */
interface NbCell {
  cell_type: 'markdown' | 'code' | 'raw';
  source: string[] | string;
}

/* Build one-click launch URLs for a notebook hosted on GitHub
   (github.com/<owner>/<repo>/blob/<branch>/<path>). */
function notebookLaunchUrls(sourceUrl: string) {
  const m = sourceUrl.match(/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/);
  if (!m) return null;
  const [, owner, repo, branch, file] = m;
  return {
    colab: `https://colab.research.google.com/github/${owner}/${repo}/blob/${branch}/${file}`,
    binder: `https://mybinder.org/v2/gh/${owner}/${repo}/${branch}?labpath=${encodeURIComponent(file)}`,
  };
}

function NotebookViewer({ path, title, sourceUrl }: { path: string; title: string; sourceUrl: string }) {
  const [cells, setCells] = useState<NbCell[] | null>(null);
  const [error, setError] = useState(false);
  const launch = notebookLaunchUrls(sourceUrl);

  useEffect(() => {
    fetch(path)
      .then((r) => r.json())
      .then((nb) => setCells(nb.cells ?? []))
      .catch(() => setError(true));
  }, [path]);

  return (
    <figure className="viewer viewer-notebook">
      <figcaption>
        <span className="viewer-tag tag-notebook">Notebook</span> {title}
        <a className="viewer-open" href={sourceUrl} target="_blank" rel="noopener noreferrer">
          View on GitHub ↗
        </a>
      </figcaption>
      {launch && (
        <div className="nb-launch">
          <span className="nb-launch-label">Read-only preview below — run it yourself:</span>
          <a className="btn btn-primary nb-launch-btn" href={launch.colab} target="_blank" rel="noopener noreferrer">
            ▶ Open in Google Colab
          </a>
          <a className="btn btn-ghost nb-launch-btn" href={launch.binder} target="_blank" rel="noopener noreferrer">
            Launch on Binder
          </a>
          <span className="viewer-note">
            In Colab or Binder, run <code>%pip install jupyter_ai_magics</code> first and set a model-provider API
            key — the <code>%%ai</code> magic cells will then work. The Jupyternaut chat-sidebar parts of the lesson
            need JupyterLab with the{' '}
            <a href="https://github.com/jupyterlab/jupyter-ai" target="_blank" rel="noopener noreferrer">
              jupyter-ai
            </a>{' '}
            extension installed (e.g. locally).
          </span>
        </div>
      )}
      <div className="notebook">
        {error && (
          <p className="pdf-fallback">
            Couldn’t load the notebook. <a href={sourceUrl}>View it on GitHub</a> instead.
          </p>
        )}
        {!error && cells === null && <p className="muted">Loading notebook…</p>}
        {cells?.map((cell, i) => {
          const src = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
          if (cell.cell_type === 'markdown') {
            return <div key={i} className="nb-md" dangerouslySetInnerHTML={{ __html: marked.parse(src) as string }} />;
          }
          if (cell.cell_type === 'code') {
            return (
              <pre key={i} className="nb-code">
                <code>{src}</code>
              </pre>
            );
          }
          return null;
        })}
      </div>
    </figure>
  );
}

function LinkCard({ url, title, note }: { url: string; title: string; note?: string }) {
  return (
    <a className="link-card" href={url} target="_blank" rel="noopener noreferrer">
      <span className="viewer-tag tag-link">Resource</span>
      <span className="link-card-title">{title}</span>
      {note && <span className="viewer-note">{note}</span>}
      <span className="link-card-arrow">↗</span>
    </a>
  );
}

export function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case 'video':
      return <VideoEmbed youtubeId={block.youtubeId} title={block.title} note={block.note} />;
    case 'playlist':
      return <VideoEmbed youtubeId={block.youtubeId} playlistId={block.playlistId} title={block.title} note={block.note} />;
    case 'slides':
      return <SlidesEmbed googleId={block.googleId} title={block.title} />;
    case 'doc':
      return <DocEmbed googleId={block.googleId} title={block.title} />;
    case 'pdf':
      return <PdfEmbed url={block.url} title={block.title} note={block.note} />;
    case 'notebook':
      return <NotebookViewer path={block.path} title={block.title} sourceUrl={block.sourceUrl} />;
    case 'link':
      return <LinkCard url={block.url} title={block.title} note={block.note} />;
  }
}
