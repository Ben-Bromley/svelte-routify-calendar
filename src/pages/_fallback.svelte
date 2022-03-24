<script>
    import { url } from '@roxi/routify'
</script>

<style>
  .huge {
    font-size: 10rem;
  }
  .e404 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 60vw;
    
  }
  .big {
    font-size: 2rem;
  }
</style>

<div class="e404">
  <div class="huge">404</div>
  <div class="big">Whoops! Sorry, we couldn't find that page.<br /> 
  <!-- link to the parent folder of _fallback.svelte -->
  <a href={$url('../')}>Go back</a>
  </div>
</div>
