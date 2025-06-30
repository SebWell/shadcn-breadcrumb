export default {
  editor: {
    label: {
      en: "shadcn Breadcrumb",
      fr: "Fil d'Ariane shadcn"
    },
    icon: 'fas fa-sitemap',
    bubble: {
      icon: 'fas fa-sitemap'
    },
    deprecated: false
  },
  properties: {
    items: {
      label: {
        en: "Breadcrumb items",
        fr: "Éléments du fil d'Ariane"
      },
      type: "Info",
      options: {
        text: { 
          en: "Configure breadcrumb items in the repeater below",
          fr: "Configurez les éléments du fil d'Ariane dans le répéteur ci-dessous"
        }
      },
      section: "content"
    },
    maxItems: {
      label: {
        en: "Maximum items to show",
        fr: "Nombre maximum d'éléments à afficher"
      },
      type: "Number",
      defaultValue: null,
      bindable: true,
      section: "display"
    },
    itemsBeforeCollapse: {
      label: {
        en: "Items before collapse",
        fr: "Éléments avant réduction"
      },
      type: "Number",
      defaultValue: 1,
      hidden: content => !content.maxItems,
      section: "display"
    },
    itemsAfterCollapse: {
      label: {
        en: "Items after collapse",
        fr: "Éléments après réduction"
      },
      type: "Number",
      defaultValue: 1,
      hidden: content => !content.maxItems,
      section: "display"
    },
    linkComponent: {
      label: {
        en: "Link component",
        fr: "Composant de lien"
      },
      type: "TextSelect",
      options: {
        options: [
          { value: "a", label: { en: "Anchor (a)", fr: "Ancre (a)" } },
          { value: "router-link", label: { en: "Router Link", fr: "Lien Router" } },
          { value: "nuxt-link", label: { en: "Nuxt Link", fr: "Lien Nuxt" } }
        ]
      },
      defaultValue: "a",
      section: "behavior"
    },
    customSeparator: {
      label: {
        en: "Custom separator icon",
        fr: "Icône de séparateur personnalisé"
      },
      type: "Icon",
      bindable: true,
      section: "appearance"
    },
    clickWorkflowId: {
      label: {
        en: "Click workflow",
        fr: "Workflow de clic"
      },
      type: "WorkflowId",
      bindable: true,
      section: "behavior"
    },
    customClasses: {
      label: {
        en: "Custom CSS classes",
        fr: "Classes CSS personnalisées"
      },
      type: "Text",
      bindable: true,
      section: "style"
    }
  },
  events: {
    click: {
      label: {
        en: "On item click",
        fr: "Lors du clic sur un élément"
      },
      default: null
    }
  },
  sections: {
    content: {
      label: { en: "Content", fr: "Contenu" },
      expand: true
    },
    display: {
      label: { en: "Display", fr: "Affichage" },
      expand: false
    },
    appearance: {
      label: { en: "Appearance", fr: "Apparence" },
      expand: false
    },
    behavior: {
      label: { en: "Behavior", fr: "Comportement" },
      expand: false
    },
    style: {
      label: { en: "Style", fr: "Style" },
      expand: false
    }
  }
}; 