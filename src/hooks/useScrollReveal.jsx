import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useScrollReveal – IntersectionObserver-based scroll reveal hook.
 *
 * Returns a ref to attach to any element. When the element enters the
 * viewport it gains the `data-visible="true"` attribute (and `isVisible`
 * flips to true) enabling CSS / Tailwind transitions.
 *
 * @param {Object}  options
 * @param {number}  options.threshold  – 0-1, how much must be visible (default 0.15)
 * @param {string}  options.rootMargin – margin around root (default "0px 0px -60px 0px")
 * @param {boolean} options.once       – unobserve after first reveal (default true)
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once = true
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          el.setAttribute('data-visible', 'true');
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
          el.removeAttribute('data-visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * useScrollRevealMany – observe multiple children inside a container.
 *
 * Attach the returned `containerRef` to a wrapper. Every direct child
 * (or elements matching `selector`) will be observed individually and
 * revealed with a staggered delay.
 *
 * @param {Object}  options
 * @param {string}  options.selector   – CSS selector for children (default "> *")
 * @param {number}  options.threshold  – 0-1 (default 0.1)
 * @param {string}  options.rootMargin – (default "0px 0px -40px 0px")
 * @param {number}  options.stagger    – ms between each child reveal (default 80)
 * @param {boolean} options.once       – (default true)
 */
export function useScrollRevealMany({
  selector = '> *',
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  stagger = 80,
  once = true
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.removeAttribute('data-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe & stagger all current children
    const observeChildren = () => {
      const children = container.querySelectorAll(':scope ' + selector);
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * stagger}ms`;
        // Only observe children that haven't been revealed yet
        if (!child.hasAttribute('data-visible')) {
          io.observe(child);
        }
      });
    };

    observeChildren();

    // Watch for child additions/removals (e.g. filter changes) and
    // reveal new children automatically
    const mo = new MutationObserver(() => {
      observeChildren();
    });
    mo.observe(container, { childList: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [selector, threshold, rootMargin, stagger, once]);

  return containerRef;
}

/**
 * ScrollReveal wrapper component — simpler declarative API.
 *
 * <ScrollReveal animation="fade-up" delay={100}>
 *   <div>Content</div>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.15,
  once = true,
  className = '',
  as: Tag = 'div'
}) {
  const { ref, isVisible } = useScrollReveal({ threshold, once });

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal scroll-reveal--${animation} ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export default useScrollReveal;
