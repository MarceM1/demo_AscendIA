interface UserProps {
    firstName?: string;
    lastName?: string;
    userEmail?: string;
    userImg?: string;
}

interface DashboardHeaderProps {
  userImg?: string | null;
  path?: string;
  subPath?: string;
}

enum Areas {
  it = "it",
  marketing = "marketing",
  administración = "administración",
  ventas = "ventas",
  diseño = "diseño",
}
