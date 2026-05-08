const RecursosUtils = {
    storage: {
        get(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch { return null; }
        },
        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove(key) {
            localStorage.removeItem(key);
        }
    },
    
    random: {
        int(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        item(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
        shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
    },
    
    ui: {
        showToast(message, duration = 2000) {
            const existing = document.querySelector('.toast');
            if (existing) existing.remove();
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), duration);
        },
        
        showFeedback(elementId, isCorrect, message) {
            const el = document.getElementById(elementId);
            if (!el) return;
            el.style.display = 'block';
            el.className = 'feedback ' + (isCorrect ? 'correcto' : 'incorrecto');
            el.textContent = message;
        },
        
        clearFeedback(elementId) {
            const el = document.getElementById(elementId);
            if (el) {
                el.style.display = 'none';
                el.className = 'feedback';
            }
        }
    },
    
    math: {
        gcd(a, b) {
            a = Math.abs(a);
            b = Math.abs(b);
            while (b) {
                [a, b] = [b, a % b];
            }
            return a;
        },
        lcm(a, b) {
            return Math.abs(a * b) / this.gcd(a, b);
        }
    },
    
    keyboard: {
        enter(elementId, callback) {
            const el = document.getElementById(elementId);
            if (el) {
                el.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') callback();
                });
            }
        }
    },
    
    date: {
        now() {
            return new Date().toLocaleString('es-ES');
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecursosUtils;
}