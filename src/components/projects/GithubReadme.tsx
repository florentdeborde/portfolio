import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Info, Lightbulb, AlertCircle, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { Loader } from '@/components/common/Loader';
import { GlassPanel } from '@/components/common/GlassPanel';
import { getReadingTime } from '@/utils/readingTime';
import { useTranslation } from 'react-i18next';
import styles from './GithubReadme.module.css';

interface AlertProps {
    type: string;
    children: React.ReactNode;
}

const Alert = ({ type, children }: AlertProps) => {
    const icons: Record<string, React.ReactNode> = {
        NOTE: <Info size={16} />,
        TIP: <Lightbulb size={16} />,
        IMPORTANT: <AlertCircle size={16} />,
        WARNING: <AlertTriangle size={16} />,
        CAUTION: <ShieldCheck size={16} />
    };

    const typeClass = `githubAlert${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`;

    return (
        <div className={`${styles.githubAlert} ${styles[typeClass]}`}>
            <div className={styles.alertTitle}>
                {icons[type]}
                <span>{type}</span>
            </div>
            <div className={styles.alertContent}>
                {children}
            </div>
        </div>
    );
};

interface GithubReadmeProps {
    repoRawUrl: string | undefined;
    loadingText?: string;
    errorText?: string;
}

export const GithubReadme = ({ repoRawUrl, loadingText, errorText }: GithubReadmeProps) => {
    const { t } = useTranslation();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [readTime, setReadTime] = useState(0);

    useEffect(() => {
        if (!repoRawUrl) return;



        const fetchPromise = fetch(repoRawUrl)
            .then(res => {
                if (!res.ok) throw new Error(errorText);
                return res.text();
            });

        const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));

        Promise.all([fetchPromise, timerPromise])
            .then(([text]) => {
                setContent(text);
                setLoading(false);
                setReadTime(getReadingTime(text));
            })
            .catch(err => {
                if (import.meta.env.DEV) console.error(err);
                setLoading(false);
            });
    }, [repoRawUrl, errorText]);

    if (loading) return <Loader text={loadingText} />;
    if (!content) return null;

    const githubStyleNormalize = (text: string | null) => {
        if (!text) return "";
        return text
            .replace(/[\uFE0F\u200D]/g, '') // Strip invisible chars
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')     // Strip symbols
            .trim()
            .replace(/\s+/g, '-')         // Spaces to hyphens
            .replace(/-+/g, '-')          // Collapse multiple hyphens
            .replace(/^-+/, '')           // Strip leading hyphens
            .replace(/-+$/, '');          // Strip trailing hyphens
    };

    const generateSlug = (node: React.ReactNode): string => {
        const getText = (node: React.ReactNode): string => {
            if (Array.isArray(node)) return node.map(getText).join('');
            if (typeof node === 'string') return node;
            if (React.isValidElement(node)) {
                const element = node as React.ReactElement<{ children?: React.ReactNode }>;
                return getText(element.props.children);
            }
            return '';
        };
        return githubStyleNormalize(getText(node));
    };

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            try {
                const decodedId = decodeURIComponent(href.slice(1));
                const targetId = githubStyleNormalize(decodedId);
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', href);
                }
            } catch (err) {
                if (import.meta.env.DEV) console.error('Failed to decode anchor:', href, err);
            }
        }
    };

    const components = {
        h1: ({ children }: React.ComponentPropsWithoutRef<'h1'>) => <h1 id={generateSlug(children)}>{children}</h1>,
        h2: ({ children }: React.ComponentPropsWithoutRef<'h2'>) => <h2 id={generateSlug(children)}>{children}</h2>,
        h3: ({ children }: React.ComponentPropsWithoutRef<'h3'>) => <h3 id={generateSlug(children)}>{children}</h3>,
        h4: ({ children }: React.ComponentPropsWithoutRef<'h4'>) => <h4 id={generateSlug(children)}>{children}</h4>,
        h5: ({ children }: React.ComponentPropsWithoutRef<'h5'>) => <h5 id={generateSlug(children)}>{children}</h5>,
        h6: ({ children }: React.ComponentPropsWithoutRef<'h6'>) => <h6 id={generateSlug(children)}>{children}</h6>,
        a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<'a'>) => {
            if (href?.startsWith('#')) {
                return <a href={href} onClick={(e) => handleAnchorClick(e, href)} {...props}>{children}</a>;
            }
            return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        table: ({ node: _node, ...props }: React.ComponentPropsWithoutRef<'table'> & { node?: unknown }) => (
            <div className={styles.tableContainer}>
                <table {...props} />
            </div>
        ),
        blockquote: ({ children }: React.ComponentPropsWithoutRef<'blockquote'>) => {
            // Find the first paragraph
            const childrenArray = React.Children.toArray(children);
            const firstChild = childrenArray.find(child =>
                React.isValidElement(child) && (child.type === 'p' || ((child as React.ReactElement<{ children?: React.ReactNode }>).props.children))
            ) as React.ReactElement<{ children: React.ReactNode }> | undefined;

            if (firstChild) {
                const props = firstChild.props;
                const firstGrandchild = Array.isArray(props.children)
                    ? props.children[0]
                    : props.children;

                if (typeof firstGrandchild === 'string') {
                    const match = firstGrandchild.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
                    if (match) {
                        const type = match[1].toUpperCase();

                        // Create new children without the identifier
                        const updatedChildren = Array.isArray(props.children)
                            ? [props.children[0].replace(/^\[!.*?\]\s*/, ''), ...props.children.slice(1)]
                            : (props.children as string).replace(/^\[!.*?\]\s*/, '');

                        const updatedFirstChild = React.cloneElement(firstChild, {
                            children: updatedChildren
                        } as React.HTMLAttributes<HTMLElement>);

                        const otherChildren = childrenArray.filter(child => child !== firstChild);

                        return (
                            <Alert type={type}>
                                {[updatedFirstChild, ...otherChildren]}
                            </Alert>
                        );
                    }
                }
            }
            return <blockquote>{children}</blockquote>;
        }
    };

    return (
        <GlassPanel className={styles.markdownBody}>
            <div className={styles.metaInfo}>
                <Clock size={16} />
                <span>{t('nav.readingTime', { count: readTime })}</span>
            </div>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </GlassPanel>
    );
};
