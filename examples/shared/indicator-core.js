export const SHARED_INDICATOR_ID = 'sample.sma3';

export function createSampleData(length = 20, seed = 100) {
  const rows = [];
  let price = seed;
  for (let i = 0; i < length; i += 1) {
    const drift = Math.sin(i / 2) * 1.4;
    price = Number((price + drift + (i % 3 === 0 ? 0.8 : -0.3)).toFixed(2));
    rows.push({ x: i + 1, close: price });
  }
  return rows;
}

function sma(values, period) {
  return values.map((_, index) => {
    if (index + 1 < period) return null;
    const slice = values.slice(index + 1 - period, index + 1);
    const avg = slice.reduce((sum, val) => sum + val, 0) / period;
    return Number(avg.toFixed(2));
  });
}

export function createIndicatorRegistry() {
  const map = new Map();
  return {
    registerIndicator(definition) {
      if (!definition?.id || typeof definition.compute !== 'function') {
        throw new Error('Indicator definition must include id and compute');
      }
      map.set(definition.id, definition);
      return {
        unregister() {
          map.delete(definition.id);
        },
      };
    },
    getIndicator(id) {
      return map.get(id);
    },
  };
}

export function createSma3Indicator() {
  return {
    id: SHARED_INDICATOR_ID,
    label: 'SMA(3)',
    compute(data) {
      return sma(data.map((row) => row.close), 3);
    },
  };
}

export function createIndicatorChart(container, indicator, data, onLifecycle) {
  const state = { data: [...data], indicatorSeries: indicator.compute(data) };

  function linePath(points, accessor, width, height, min, range) {
    return points
      .map((point, i) => {
        const y = accessor(point, i);
        if (y == null) return null;
        const px = (i / Math.max(points.length - 1, 1)) * width;
        const py = height - ((y - min) / range) * height;
        return `${px.toFixed(1)},${py.toFixed(1)}`;
      })
      .filter(Boolean)
      .join(' ');
  }

  function render() {
    const width = 560;
    const height = 200;
    const values = state.data.map((d) => d.close).concat(state.indicatorSeries.filter((v) => v != null));
    const min = Math.min(...values) - 1;
    const max = Math.max(...values) + 1;
    const range = max - min || 1;

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="chart" role="img" aria-label="Close and SMA(3)">
        <polyline points="${linePath(state.data, (d) => d.close, width, height, min, range)}" class="line close"/>
        <polyline points="${linePath(state.data, (_, i) => state.indicatorSeries[i], width, height, min, range)}" class="line indicator"/>
      </svg>
      <div class="meta">rows: ${state.data.length} / indicator: ${indicator.label} (${indicator.id})</div>
    `;
  }

  onLifecycle?.('init', { indicatorId: indicator.id, rows: state.data.length });
  render();

  return {
    update(nextData) {
      state.data = [...nextData];
      state.indicatorSeries = indicator.compute(state.data);
      onLifecycle?.('update', { indicatorId: indicator.id, rows: state.data.length });
      render();
    },
    dispose() {
      onLifecycle?.('dispose', { indicatorId: indicator.id, rows: state.data.length });
      container.innerHTML = '<p class="disposed">chart disposed</p>';
    },
  };
}
