<template>
  <LineChartGenerator :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler
);
export default {
  name: "LineChart",
  props: {
    chartData: Object,
  },
  components: {
    LineChartGenerator,
  },
  data() {
    return {
      chartOptions: {
        // 컨테이너가 수행 할 때 차트 캔버스의 크기를 조정(dafalut : true)
        responsive: true,
        // 크기 조정 이벤트 후 새 크기로 애니메이션하는 데 걸리는 시간(밀리 초) (defalut : 0)
        responsiveAnimationDuration: 1000,
        // (width / height) 크기를 조정할 떄 원래 캔버스 종횡비를 유지 (defalut : true)
        maintainAspectRatio: true,
        spanGaps: true,
        // line 타입의 경우 중간에 누락된 데이터가 있을 경우 이어그릴지 여부를 정합니다!
        grouped: true,
        // x축 값이 같은 애들끼리 그룹화할지를 정하는데요,
        // true 설정 시 해당 x축 값내에서 서로 공간을 나누면서 나란히 보여지게 되고,
        // false 설정 시 각 포인트가 해당 x축 정중앙에 그려지게 되어서 x축 값이 같은 애들끼리 서로 겹쳐지게 됩니다.
        interaction: {
          mode: "index",
        },
        // 호버 동작과 관련된 설정인데요, 호버를 하게 되면 툴팁이 뜨게 되는데
        // 그 툴팁이 뜨는 기준을 설정할 수 있습니다.
        // 위와 같이 index를 기준으로 설정하게 되면 동일한 index에 놓인 값들이 모두 떠요!
        plugins: {
          legend: {
            // 범례 스타일링
            labels: {
              usePointStyle: true,
              // 범례 도형 모양과 관련된 속성으로, false일 경우엔 기본 직사각형 도형으로 표시됩니다.
              padding: 10,
              // 범례 간 가로 간격을 조정할 수 있습니다. 범례의 상하 padding을 지정하는 기능은 따로 지원되지 않아요. ㅠㅠ
              font: {
                // 범례의 폰트 스타일도 지정할 수 있습니다.
                family: "'Noto Sans KR', 'serif'",
                lineHeight: 1,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(124, 35, 35, 0.4)",
            padding: 10,
            bodySpacing: 5,
            bodyFont: {
              font: {
                family: "'Noto Sans KR', sans-serif",
              },
            },
            usePointStyle: true,
            filter: (item) => item.parsed.y !== null,
            callbacks: {
              title: (context) => context[0].label + "🔥",
              label: (context) => {
                let label = context.dataset.label + "" || "";

                return context.parsed.y !== null
                  ? label + ": " + context.parsed.y + "점"
                  : null;
              },
            },
          },
        },
        scales: {
          // x축과 y축에 대한 설정을 할 수 있습니다.
          x: {
            // 여기서 x는 이 축의 id인데요, 이 안에서 axis 속성만 x로 지정해놓으시면 id를 x가 아니라 다른 이름으로 설정해도 무관합니다.
            grid: {
              // x축을 기준으로 그려지는 선(세로선)에 대한 설정입니다.
              display: false, // 선이 아예 안 그려지게 됩니다.
              drawTicks: true, // 눈금 표시 여부를 지정합니다.
              tickLength: 5, // 눈금 길이를 지정합니다.
              color: "#E2E2E230", // 눈금 및 선의 색상을 지정합니다.
            },
            axis: "x", // x축(가로축)인지 y축(세로축)인지 표시합니다.
            position: "bottom",
            // top으로 설정하면 가로축이 차트 상단에 그려지게 됩니다!
            ticks: {
              minRotation: 45, // x축 값의 회전 각도를 설정할 수 있어요.
              padding: 5, // x축 값의 상하 패딩을 설정할 수 있어요.
            },
          },
          y: {
            // 'y'라는 id를 가진 y축에 대한 설정
            type: "linear",
            // 리니어 스케일뿐만 아니라 로그 스케일로도 표시할 수 있습니다.
            grid: {
              // 가로선 설정
              color: "#00000015",
            },
            max: 100,
            min: 0,
            afterDataLimits: (scale) => {
              // y축의 최대값은 데이터의 최대값에 딱 맞춰져서 그려지므로
              // y축 위쪽 여유공간이 없어 좀 답답한 느낌이 들 수 있는데요,
              // 이와 같이 afterDataLimits 콜백을 사용하여 y축의 최대값을 좀 더 여유있게 지정할 수 있습니다!
              scale.max = scale.max * 1.1;
            },
            axis: "y", // 이 축이 y축임을 명시해줍니다.
            display: true, // 축의 가시성 여부도 설정할 수 있습니다.
            position: "left", // 축이 왼쪽에 표시될지, 오른쪽에 표시될지 정할 수 있습니다.
            title: {
              // 이 축의 단위 또는 이름도 title 속성을 이용하여 표시할 수 있습니다.
              display: true,
              align: "end",
              color: "#808080",
              font: {
                size: 12,
                family: "'Noto Sans KR', sans-serif",
                weight: 300,
              },
              text: "점수 (점)",
            },
          },
          // y축을 여러 개 두고 싶다면 아래와 같이 또 만들어 주세요.
        },
      },
    };
  },
};
</script>
