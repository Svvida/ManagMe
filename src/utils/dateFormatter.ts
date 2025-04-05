 export const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      minute: '2-digit',
      hour: '2-digit',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
