<template>
  <nav 
    :class="breadcrumbClasses"
    aria-label="breadcrumb"
  >
    <ol :class="breadcrumbListClasses">
      <template v-for="(item, index) in visibleItems" :key="`breadcrumb-${index}`">
        <!-- Regular Breadcrumb Item -->
        <li 
          v-if="item.type !== 'ellipsis'"
          :class="breadcrumbItemClasses"
        >
          <!-- Link Item -->
          <component
            v-if="item.href && !item.isCurrentPage"
            :is="content.linkComponent || 'a'"
            :href="item.href"
            :to="item.to"
            :class="breadcrumbLinkClasses"
            @click="handleClick(item, index)"
          >
            <component v-if="item.icon" :is="item.icon" class="w-4 h-4 mr-1" />
            {{ item.label }}
          </component>
          
          <!-- Current Page -->
          <span
            v-else
            :class="breadcrumbPageClasses"
            role="link"
            aria-disabled="true"
            aria-current="page"
          >
            <component v-if="item.icon" :is="item.icon" class="w-4 h-4 mr-1" />
            {{ item.label }}
          </span>
        </li>

        <!-- Ellipsis -->
        <li
          v-else
          :class="breadcrumbEllipsisClasses"
          role="presentation"
          aria-hidden="true"
        >
          <span class="flex h-9 w-9 items-center justify-center">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
            <span class="sr-only">More</span>
          </span>
        </li>

        <!-- Separator -->
        <li
          v-if="index < visibleItems.length - 1"
          :class="breadcrumbSeparatorClasses"
          role="presentation"
          aria-hidden="true"
        >
          <component v-if="content.customSeparator" :is="content.customSeparator" />
          <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { cn } from './cn.js'

export default {
  name: 'WewebBreadcrumb',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        items: [
          { label: 'Home', href: '/', icon: null },
          { label: 'Category', href: '/category', icon: null },
          { label: 'Current Page', isCurrentPage: true, icon: null }
        ],
        maxItems: null,
        itemsBeforeCollapse: 1,
        itemsAfterCollapse: 1,
        linkComponent: 'a', // or 'router-link' for Vue Router
        customSeparator: null,
        customClasses: ''
      })
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const visibleItems = computed(() => {
      const items = props.content.items
      const maxItems = props.content.maxItems
      
      if (!maxItems || items.length <= maxItems) {
        return items
      }

      const beforeCollapse = props.content.itemsBeforeCollapse
      const afterCollapse = props.content.itemsAfterCollapse
      
      const startItems = items.slice(0, beforeCollapse)
      const endItems = items.slice(-afterCollapse)
      
      return [
        ...startItems,
        { type: 'ellipsis' },
        ...endItems
      ]
    })

    const breadcrumbClasses = computed(() => cn(
      props.content.customClasses
    ))

    const breadcrumbListClasses = computed(() => cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5"
    ))

    const breadcrumbItemClasses = computed(() => cn(
      "inline-flex items-center gap-1.5"
    ))

    const breadcrumbLinkClasses = computed(() => cn(
      "transition-colors hover:text-foreground inline-flex items-center"
    ))

    const breadcrumbPageClasses = computed(() => cn(
      "font-normal text-foreground inline-flex items-center"
    ))

    const breadcrumbSeparatorClasses = computed(() => cn(
      "[&>svg]:w-3.5 [&>svg]:h-3.5"
    ))

    const breadcrumbEllipsisClasses = computed(() => cn(
      "flex h-9 w-9 items-center justify-center"
    ))

    const handleClick = (item, index) => {
      emit('click', { item, index })
      
      // Execute Weweb workflow if defined
      if (props.content.clickWorkflowId && typeof wwLib !== 'undefined') {
        wwLib.executeWorkflow(props.content.clickWorkflowId)
      }
    }

    return {
      visibleItems,
      breadcrumbClasses,
      breadcrumbListClasses,
      breadcrumbItemClasses,
      breadcrumbLinkClasses,
      breadcrumbPageClasses,
      breadcrumbSeparatorClasses,
      breadcrumbEllipsisClasses,
      handleClick
    }
  }
}
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 