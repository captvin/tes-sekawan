export default function() {
  return [
    {
      title: "Dashboard",
      to: "/Dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Office",
      htmlBefore: '<i class="material-icons">business</i>',
      to: "/blog-posts",
    },
    {
      title: "Tambang",
      htmlBefore: '<i class="material-icons">diamond</i>',
      to: "/add-new-post",
    },
    {
      title: "pegawai",
      htmlBefore: '<i class="material-icons">badge</i>',
      to: "/components-overview",
    },
    {
      title: "driver",
      htmlBefore: '<i class="material-icons">engineering</i>',
      to: "/tables",
    },
    {
      title: "Unit",
      htmlBefore: '<i class="material-icons">toys</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
