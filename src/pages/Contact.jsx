import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function Contact() {
  usePageTitle('Contact Us')
  const { t } = usePageContent('contact')

  return (
    <section className="min-h-screen bg-[#f4faff] pb-16 pt-20">
      {/* Hero Header Banner */}
      <div className="w-full bg-[#0d1527] text-white py-14 px-6 text-center mb-10 shadow-md">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide">
          {t('heading', 'Get in Touch')}
        </h1>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
        <p className="text-slate-300 font-serif mt-3 text-base md:text-lg">
          {t('subtitle', 'We value your inquiry. Kindly fill the form below.')}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
          {/* Form */}
          <div className="flex-1">
            <div className="bg-white border border-blue-100/70 rounded-2xl p-6 sm:p-8 shadow-lg">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  <button type="submit" className="w-full px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm tracking-wide hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-500/25">{t('formSubmit', 'Send Message')}</button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:w-96 flex flex-col justify-between bg-white border border-blue-100/70 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-blue-950">{t('infoHeading', 'Contact Information')}</h3>
              <div>
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-1">{t('addressLabel', 'Address')}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{t('addressValue', 'Satara Polytechnic, near NH - 4, near Khindwadi, Songaon, Maharashtra 415519')}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-1">{t('phoneLabel', 'Phone Numbers')}</p>
                <p className="text-gray-700 text-sm">{t('phone1', '+91 94233 42843')}</p>
                <p className="text-gray-700 text-sm">{t('phone2', '+91 98817 26261')}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-1">{t('timingsLabel', 'Office Timings')}</p>
                <p className="text-gray-700 text-sm">{t('timingsValue', 'Monday to Friday | 10 am to 5 pm')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
