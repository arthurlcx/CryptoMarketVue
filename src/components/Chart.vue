<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: {
        chartData: {
            type: Array,
            default: null,
            required: true
        },
        chartLabels: {
            type: Array,
            required: true
        },
        options: {
            type: Object,
            default: null
        }
    },
    data() {
        return{
            
        }
    },
    mounted() {
        this.gradient = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 0, 450)
        this.gradient.addColorStop(0, 'rgba(52, 217, 221, 0.6)')
        this.gradient.addColorStop(0.5, 'rgba(52, 217, 221, 0.25)')
        this.gradient.addColorStop(1, 'rgba(52, 217, 221, 0)')

        this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Price in USD',
            borderColor: '#249EBF',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            pointHoverBorderColor: '#249EBF',
            pointHoverBackgroundColor: '#fff',
            pointHoverRadius: 4,
            pointHitRadius: 10,
            pointHoverBorderWidth: 1,
            borderWidth: 1,
            backgroundColor: this.gradient,
            data: this.chartData
          }
        ]
      }, this.options)

    }
}
</script>


<style>

</style>
