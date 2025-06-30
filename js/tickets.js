const palette = [
        getComputedStyle(document.documentElement).getPropertyValue("--light").trim(),
        getComputedStyle(document.documentElement).getPropertyValue("--dark").trim(),
      ];
      const POINTS = 14; // сколько лучей у фигуры

      // === Утилита: подгоняем внутренний буфер canvas к фактическому размеру ===
      function fitCanvasResolution(canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width  = Math.round(width);
        canvas.height = Math.round(height);
      }

      // === Генерация пути ===
      function createBlobPath(rMin = 30, rMax = 74, points = POINTS) {
        const step = (Math.PI * 2) / points;
        const radii = Array.from({ length: points }).map(function () {
          return Math.random() * (rMax - rMin) + rMin;
        });

        let d = "";
        for (let i = 0; i < points; i++) {
          const theta     = i * step;
          const nextTheta = (i + 1) * step;
          const r1 = radii[i];
          const r2 = radii[(i + 1) % points];

          const cx1 = 75 + r1 * Math.cos(theta);
          const cy1 = 75 + r1 * Math.sin(theta);
          const cx2 = 75 + r2 * Math.cos(nextTheta);
          const cy2 = 75 + r2 * Math.sin(nextTheta);

          const midTheta = theta + step / 2;
          const rc = (r1 + r2) / 2;
          const cpx = 75 + rc * Math.cos(midTheta);
          const cpy = 75 + rc * Math.sin(midTheta);

          d += i === 0 ? `M ${cx1} ${cy1} ` : "";
          d += `Q ${cpx} ${cpy} ${cx2} ${cy2} `;
        }
        return d + "Z";
      }

      // === Рисование ===
      function drawBlob(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const path = new Path2D(createBlobPath());
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.fill(path);
      }

      // === Анимация ===
      function startAnimation() {
        document.querySelectorAll('.cell canvas').forEach(function (canvas) {
          fitCanvasResolution(canvas);
          const ctx = canvas.getContext('2d');

          function render() {
            drawBlob(ctx);
          }

          const firstDelay = Math.random() * 5000;
          setTimeout(function () {
            render();
            setInterval(render, 5000);
          }, firstDelay);
        });
      }

      document.addEventListener('DOMContentLoaded', startAnimation);