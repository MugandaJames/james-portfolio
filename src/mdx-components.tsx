
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => <h2 className="article-h2" {...props} />,
  h3: (props) => <h3 className="article-h3" {...props} />,
  p: (props) => <p className="article-paragraph" {...props} />,
  ul: (props) => <ul className="article-list-content" {...props} />,
  ol: (props) => <ol className="article-list-content" {...props} />,
  blockquote: (props) => (
    <blockquote className="article-blockquote" {...props} />
  ),
  pre: (props) => <pre className="article-code-block" {...props} />,
  a: (props) => <a className="article-inline-link" {...props} />,
  hr: () => <hr className="article-divider" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
