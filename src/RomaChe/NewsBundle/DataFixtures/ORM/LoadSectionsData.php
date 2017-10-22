<?php
namespace RomaChe\NewsBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use RomaChe\AuthBundle\Entity\Users;
use RomaChe\NewsBundle\Entity\Chmod;
use RomaChe\NewsBundle\Entity\Section;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\ORM\EntityManagerInterface;

class LoadUserData implements  FixtureInterface, ContainerAwareInterface
{
    private $container;

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $sectionsArr = array(
          'world news',
          'sport',
          'tech',
          'busines',
          'movies',
          'culture',
          'beauty',
          'books',
          'blogs',
          'staff',
          '+'
        );

        $users = $this->container->get('doctrine')->getEntityManager('default')
          ->getRepository(Users::class);

        foreach ($sectionsArr as $value) {
          $section = new Section();

          $section->setName($value);
          $section->setDescription('fixtures generated section for section '. $value);

          $chmod = new Chmod();
          $chmod->setGroupName('SUPER');

          $chmod->setChmod( $value == 'staff' ? 710 : ($value == '+' ? 500 : 744));

          $superUser = $users->findOneBy(array('username' => 'root'));
          $chmod->setAuthor($superUser);
          $manager->persist($chmod);

          $section->setChmod($chmod);
          $manager->persist($section);
        }
        $manager->flush();

    }

    /**
     * Sets the container.
     *
     * @param ContainerInterface|null $container A ContainerInterface instance or null
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }
}
