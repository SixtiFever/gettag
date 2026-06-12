import Logo from './logo';

export default function TitleLogo() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
      }}
    >
      <Logo width={46} height={56} />
      <span
        style={{
          color: '#0f172a',
          fontSize: '26px',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        Tag.
      </span>
    </div>
  );
}
