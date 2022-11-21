export const loadPreviewStylesheet = (url: string) => {
  if ("document" in window) {
    // Check if stylesheet exists
    const link = document.getElementById(
      "preview-fonts-stylesheet"
    ) as HTMLLinkElement;

    // Remove stylesheet if it exists
    if (link) {
      link.remove();
    }

    // Create new stylesheet
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = url;
    styles.id = "preview-fonts-stylesheet";
    styles.crossOrigin = "anonymous";

    // Append stylesheet to document
    document.getElementsByTagName("head")[0].appendChild(styles);
  }
};
