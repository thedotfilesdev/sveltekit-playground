<script lang="ts">
    import { page } from "$app/stores";
</script>

<div>
  <header>
    <div>
      <p>
        {#if $page.data.session}
          {#if $page.data.session.user?.image}
            <span
              style="background-image: url('{$page.data.session.user.image}')"
              class="avatar"
            />
          {/if}
          <span>
            <small>Signed in as</small><br />
            <strong
              >{$page.data.session.user?.email ??
                $page.data.session.user?.name}</strong
            >
          </span>
          <a href="/auth/signout">Sign out</a>
        {:else}
          <span >You are not signed in</span>
          <a href="/auth/signin" >Sign in</a>
        {/if}
      </p>
    </div>
    <nav>
      <ul >
        <li ><a href="/">Home</a></li>
        <li ><a href="/protected">Protected</a></li>
        <li ><a href="/protected-two">Protected</a></li>
      </ul>
    </nav>
  </header>
  <slot />
</div>

<style></style>
