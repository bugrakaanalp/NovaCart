type ToastType = 'success' | 'info' | 'error';

export class ToastService {
  private static container: HTMLElement | null = null;

  static show(
    message: string,
    type: ToastType = 'success',
    duration = 3000
  ) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    const container = this.getContainer();
    container.appendChild(toast);

    // next tick → animasyon
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // kaldırma
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener(
        'transitionend',
        () => toast.remove(),
        { once: true }
      );
    }, duration);
  }

  private static getContainer() {
    if (this.container) return this.container;

    const existing = document.getElementById('toast-container');
    if (existing) {
      this.container = existing;
      return existing;
    }

    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    this.container = container;
    return container;
  }
}
