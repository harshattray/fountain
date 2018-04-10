/**
 * @Author: harsha
 * @Date:   2018-04-10T15:54:09+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2018-04-10T18:16:59+05:30
 */

 $(document).ready(function () {

   var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
   var audioElement = document.getElementById('audioElement');
   var audioSrc = audioCtx.createMediaElementSource(audioElement);
   var analyser = audioCtx.createAnalyser();

   // Bind our analyser to the media element source.
   audioSrc.connect(analyser);
   audioSrc.connect(audioCtx.destination);

   //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
   var frequencyData = new Uint8Array(200);

   var svgHeight = '300';
   var svgWidth = '1200';
   var barPadding = '2';

   function createSvg(parent, height, width) {
     return d3.select(parent).append('svg').attr('height', height).attr('width', width);
   }

   var svg = createSvg('body', svgHeight, svgWidth);

   // Create our initial D3 chart.
   svg.selectAll('rect')
      .data(frequencyData)
      .enter()
      .append('rect')
      .attr('x', function (d, i) {
         return i * (svgWidth / frequencyData.length);
      })
      .attr('width', svgWidth / frequencyData.length - barPadding);
      svg.selectAll("circle")
      .data(frequencyData)
      .enter()
      .append('circle')
      .attr('cx', function (d, i) {
         return i * (svgWidth / frequencyData.length);
      })
      .attr("r", function() { return svgWidth / frequencyData.length - barPadding; });

   // Continuously loop and update chart with frequency data.
   function renderChart() {
      requestAnimationFrame(renderChart);

      // Copy frequency data to frequencyData array.
      analyser.getByteFrequencyData(frequencyData);

      // Update d3 chart with new data.
      svg.selectAll('rect')
         .data(frequencyData)
         .attr('y', function(d) {
            return svgHeight - d;
         })
         .attr('height', function(d) {
            return d;
         })
         .attr('fill', function(d) {
            return 'rgb(255, 255, ' + d + ')';
         });
         svg.selectAll("circle")
         .data(frequencyData)
         .attr('cy', function (d, i) {
            return svgHeight - d;
         })
         .attr('fill', function(d) {
            return 'rgb(119,136, ' + d + ')';
         });
   }

   // Run the loop
   renderChart();

 });
