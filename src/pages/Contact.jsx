import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function Contact() {
  usePageTitle('Contact Us')
  const { t } = usePageContent('contact')

  return (
    <section className="min-h-screen bg-[#fdfcf9] px-4 sm:px-6 lg:px-12 py-12" style={{ marginTop: '86px' }}>
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-800 tracking-wide">{t('heading', 'Get in Touch')}</h1>
          <div className="w-16 h-0.5 bg-gray-900 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-500 mt-3 text-sm sm:text-base">{t('subtitle', 'We value your inquiry. Kindly fill the form below.')}</p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">

          {/* Form */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 hover:shadow-lg transition-shadow duration-300">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('formName', 'Full Name')}</label>
                    <input placeholder={t('formName', 'Full Name')} required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-800 placeholder-gray-400 transition text-sm" type="text" name="name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('formEmail', 'Email Address')}</label>
                    <input placeholder={t('formEmail', 'Email Address')} required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-800 placeholder-gray-400 transition text-sm" type="email" name="email" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('formSubject', 'Subject')}</label>
                  <input placeholder={t('formSubject', 'Subject')} required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-800 placeholder-gray-400 transition text-sm" type="text" name="subject" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('formMessage', 'Your Message')}</label>
                  <textarea name="message" placeholder={t('formMessage', 'Your Message')} required rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-800 placeholder-gray-400 transition resize-none text-sm"></textarea>
                </div>
                <div className="mt-2">
                  <button type="submit" className="w-full px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm tracking-wide hover:bg-gray-800 transition">{t('formSubmit', 'Send Message')}</button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact info */}
          <div className="lg:w-80 flex flex-col justify-between gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 cursor-default">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t('addressTitle', 'Address')}</h3>
                <p className="text-gray-500 text-sm mt-1">{t('addressValue', 'near NH - 4, near Khindwadi, Songaon, Maharashtra 415519')}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 cursor-default">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t('emailTitle', 'Email')}</h3>
                <p className="text-gray-500 text-sm mt-1">{t('emailValue', 'spscomputer2026@gmail.com')}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 cursor-default">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t('phoneTitle', 'Phone')}</h3>
                <p className="text-gray-500 text-sm mt-1">{t('phone1', '+91 9881726261')}</p>
                <p className="text-gray-500 text-sm">{t('phone2', '+91 94233 42843')}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 cursor-default">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t('hoursTitle', 'Office Hours')}</h3>
                <p className="text-gray-500 text-sm mt-1">{t('hoursWeekdays', 'Monday to Friday')}</p>
                <p className="text-gray-500 text-sm">{t('hoursTime', '10 AM – 5 PM')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
